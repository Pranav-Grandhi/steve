import { useParams } from "react-router-dom";

export default function WordType() {
  const { word } = useParams();
  return (
    <main>
      <h1>{word} is a noun (this doesn't work!)</h1>
    </main>
  );
}
