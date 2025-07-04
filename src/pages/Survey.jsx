import { useParams } from 'react-router-dom'

function Survey() {
  const { id } = useParams()

  // Placeholder for fetching survey data in the future
  // useEffect(() => {
  //   fetch(`https://materiality-assessment-tool.onrender.com/survey/${id}`)
  //     .then(res => res.json())
  //     .then(data => { ... });
  // }, [id]);

  return (
    <div>
      <h1>Survey Form</h1>
      <p>Survey ID: {id}</p>
      {/* Survey form will go here */}
    </div>
  )
}

export default Survey