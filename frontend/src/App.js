import { Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Card from './Components/Card';
import Footer from './Components/Footer';
import FormDetails from './Components/FormDetails';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';

function App() {
  const [yourImage, setImage] = useState({});

  return (
    <Router>
      <Switch>
        <Route path='/:id'>
          <Card/>
        </Route>
        <Route exact path='/'>
          <Stack alignItems={'center'} bg={'#c8e9f7'}>
            <Stack
              w={['100%', '80%']}
              m={'auto'}
              color={'black'}
              py={4}
              fontSize={['1.5rem', '2rem']}
            >
              <Text fontWeight={'bolder'} w={'80%'} m={'auto'}>DIGICARD.IO</Text>
            </Stack>
            <Stack
              justifyContent={'center'}
              w={['100%', '80%']}
              alignItems={'center'}
            >
              <Text
                color={'#2a8cb5'}
                fontSize={['1rem', '3rem']}
                textAlign={'center'}
              >
                Turn Your Images into Clickable Social Cards!
              </Text>
            </Stack>

            <FormDetails yourImage={yourImage} setImage={setImage} />
            <Footer />
          </Stack>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
