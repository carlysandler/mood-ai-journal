// fetch need to pass absolute URL
//dynamically creates new url
export const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
      body: JSON.stringify({ content: `What's on your mind?` }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const updatedEntry = async (id: string, data: { content: string }) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
