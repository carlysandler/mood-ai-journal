// fetch need to pass absolute URL
//dynamically creates new url
export const createURL = (path: string) => {
  return window.location.origin + path
}


export const createNewEntry = async () => {
  const res = await fetch(new Request(createURL('/api/journal'), {
    method: 'POST'
  }))

  if (res.ok) {
    const data = await res.json()
    console.log('did ths work? data?', data)
    return data.data
  }

}

export const updatedEntry = async (id:string, content:string) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
    method: 'PATCH',
    body: JSON.stringify(content)
  }))

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}