import { Route, Switch } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Campgrounds from "./pages/Campgrounds";
import CampgroundsNew from "./pages/CampgroundsNew";
import CampgroundShow from "./pages/CampgroundShow";
import CampgroundsEdit from "./pages/CampgroundsEdit";

function App() {
  return (
    <main className="d-flex flex-column vh-100">
      <NavbarComponent />
      <Container style={{ marginTop: "5em" }}>
        <Switch>
          <Route path="/campgrounds" exact component={Campgrounds} />
          <Route path="/campgrounds/new" exact component={CampgroundsNew} />
          <Route path={`/campgrounds/:id`} exact component={CampgroundShow} />
          <Route
            path={`/campgrounds/:id/edit`}
            exact
            component={CampgroundsEdit}
          />
        </Switch>
      </Container>
      <Footer />
    </main>
  );
}

export default App;
