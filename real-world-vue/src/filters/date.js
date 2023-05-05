/*
Methods or Computed Properties are often better choice
The pipe syntax works differently than a JS pipe proposal
*/
export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}
