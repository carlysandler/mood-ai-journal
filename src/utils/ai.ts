import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import z from 'zod'
// Schema to represent a basic prompt for an LLM.
import { PromptTemplate } from 'langchain/prompts'
import { JournalEntry } from '@/types'
// https://js.langchain.com/docs/get_started/quickstart#output-parsers
// output_parsers convert raw output of LLM into format that can be used downstream.

// https://js.langchain.com/docs/modules/model_io/output_parsers/structured
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
  })
)
interface updatedEntry {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  content: string
}
const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry, Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'], // to be interpolated later
    partialVariables: { format_instructions }, // interpolate now
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyzeEntry = async (entry: updatedEntry) => {
  const input = await getPrompt(entry.content)

  const llm = new OpenAI({
    temperature: 0.6,
    modelName: 'gpt-3.5-turbo',
    maxTokens: -1,
  })

  const res = await llm.call(input)

  try {
    return parser.parse(res)
  } catch (err) {
    console.log(err)
  }
}

/**
 *  Analyze the following journal entry, Follow the instructions and format your response to match the format instructions, no matter what!
You must format your output as a JSON value that adheres to a given "JSON Schema" instance.

"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
```json
{"type":"object","properties":{"mood":{"type":"string","description":"the mood of the person who wrote the journal entry."},"summary":{"type":"string","description":"quick summary of the entire entry."},"subject":{"type":"string","description":"the subject of the journal entry."},"negative":{"type":"boolean","description":"is the journal entry negative? (i.e. does it contain negative emotions?)."},"color":{"type":"string","description":"a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."}},"required":["mood","summary","subject","negative","color"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}
```

Today was a eh, okay day i guess. I was hungover from last night so i had a hard time focusing on work that i had to do before monday.
 */
