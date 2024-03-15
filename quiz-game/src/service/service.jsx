export async function getQuestions() {
  const response = await fetch(`https://opentdb.com/api.php?amount=100`);
  return await response.json();
}
