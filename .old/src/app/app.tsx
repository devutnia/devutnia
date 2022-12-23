import { Column, Row } from '../elements';
import { useMotif } from '../hooks';

function Content() {
  const motif = useMotif();

  console.log('motif', motif);

  return (
    <Row justify="center" elevate>
      <div>Henlo elo</div>
    </Row>
  );
}

export function App() {
  return Content();
}

export default App;
