'use client'


const NewEntryCard = () => {
  const handleOnClick = () => {}
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg card  bg-secondary">
      <div className="p-4 sm:p-6 text-center" onClick={handleOnClick}>
        <span className="text-3xl text-secondary">New Entry</span>
      </div>
  </div>
  )
}
export default NewEntryCard
