
interface Params {
  id: string
}
const EntryPage = ({ params }: { params: Params}) => {
  return <div>{params.id}</div>
} 

export default EntryPage