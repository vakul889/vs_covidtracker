import React from 'react'
import banner from '../login-screen-banner.png';
import Pagefooter from '../Components/Page.footer.component';

const backgroundStyle ={
  position: 'absolute',
  height: window.innerHeight, 
  zIndex: 0
}

const pageSize = {
  height: window.innerHeight,
  width: window.innerWidth
}

export default function Mainpage(WrappedComponent){
  return function main() {
      return(
        <div>
            <img src={banner} style={backgroundStyle} alt="background"/>
            <div className="login-page-background" style={pageSize}>
                <WrappedComponent/>
            </div>
            <Pagefooter/>
        </div>
      )
  }
}

// export default function Mainpage() {
//     const [message, setMessage] = useState("");
//     const hello = ()=>{
//       fetch('/api/hello')
//                 .then(response => response.text())
//                 .then(message => {
//                     setMessage(message);
//                 });
//     }
//     useEffect(() => {
//       setInterval(hello, 250);
//     },[])
//     return (
//       <React.Fragment>
//         <Pagetitle/>
//         <h1 className="App-title">{message}</h1>
//         <Segment placeholder size="huge">
//           <Grid columns={2} stackable textAlign='center'>
//             <Grid.Row verticalAlign='middle'>
//               <Grid.Column>
//                 Existing Member?
//                 <br/><br/>
//                 <Button variant="contained" size="large" color="primary" href="/Login">SIGN IN</Button>
//               </Grid.Column>
//               <Grid.Column>
//                 New Member?
//                 <br/><br/>
//                 <Button variant="contained" size="large" color="primary" href="/Signup">SIGN UP</Button>
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </Segment>
//       </React.Fragment>
//     )
// }
