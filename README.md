# My whereItsAt
<br>
## ReactHook: React UseContext<br>
Den tillåter funktionella komponenter att komma åt data som lagras i en kontext utan att explicit skicka props genom komponentträdet. Genom att använda useContext kan komponenter komma åt delad state eller andra värden som tillhandahålls av en kontext, vilket gör det enklare att hantera global eller delad data över olika delar av en React-applikation.
<br><br>
### Hur fungerar det?<br>
Först och främst ska man skapa en jsx-fil på under src mappen (samma nivå som App.jsx). <br><br>
Nästa steget är att skapa en context genom att skriva:<br><br>
import { createContext, useContext } from 'react';<br><br>
Nästa steg är att skapa en context objekt:<br>
const MyContext = createContext();<br><br>
Som jag har läst mig till bör man också döpa om useContext(OrderContext) hooken som till exempel useOrderContext. Detta gör att man slipper skriva en del kod när man ska kalla functioner.<br><br>
Komponenten skapas ungefär på samma sätt som övriga jsx komponenter eller pages: <br>
const OrderContextProvider = ({ children }) => //skapa funktionen{ <br>
const [variable, setVariabel] = useState(); // skapa variables<br>
const parameter = () => { <br>
//innehållet i funktionen <br>
}<br>
const value = { <br>
parameter, <br>
enParameterTill <br>
//här tar man och listar sina parametrar så att de blir tillgängliga globalt. <br>
} <br>
<br>
Nästa steg är att integrera sin context i komponenten där den behövs. Det gör man så här: <br>
import { useOrderContext } from './dinSökväg/OrderContextProvider'; <br>
och inuti funktionen: //i detta fall med en egen context hook<br>
const {parameter} = useOrderContext(); //nu ska datan vara tillgänglig inuti komponenten utan att behöva använda props <br><br>en.

Nästa steg är att wrappa innehållet i applikationen med <OrderContextProvider></OrderContextProvider>, på samma sätt som man gör med routing. Det tillgängliggör datan till alla pages emellan.<br> <br>
Det som var lockande med useContext och som gjorde att jag ville använda det var att kunna förenkla dataflödet i applikationen då props inte behövs. Vidare kunde jag samla funktioner på ett ställe och gör de tillgängliga om jag skulle behöva använda de flera gånger i olicka komponenter. Ett eftertanke jag hade var att det skulle nog vara enklare att skapa flera contexts som kunde vara kopplade till viss funktionalitet i appen.

<br>
## Extern bibliotek: react-icons
### Hur fungerar det?
React-icons är en bibliotek i React som tillhandahåller ett utbud av fördefinierade ikoner från olika ikonbibliotek som Font Awesome, Material Icons och många fler. Det gjorde det enkelt för mig att lägga till ikoner i min React-applikation utan att behöva ladda ner och hantera ikonfiler manuellt. Genom att använda React-icons kunde jag snabbt integrera ikoner i min navbar genom att helt enkelt importera och använda dem som vanliga React-komponenter.<br><br>
Börjar gör man genom att ladda ner react-icons: <br>
npm install react-icons <br><br>
När man har bläddrat igenom biblioteket och hittat ikoner man vill ha kopierar man helt enkelt import-koden som finns. koden innehåller ikonen du valt och sökvägen. Som till exempel: <br>
import { GoHomeFill, GoHome } from 'react-icons/go'; //alltså react-icons/ikonens mapp <br><br>
inuti returnsektionen integrerar man ikonen på samma sätt som om det våra en komponent. importen kan innehålla styling och annat features som i detta exempel: <br>
<GoHomeFill/> <br>
