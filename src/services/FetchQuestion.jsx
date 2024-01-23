async function fetchQuestion() {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/3-2/subjects/2387/questions/`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default fetchQuestion;