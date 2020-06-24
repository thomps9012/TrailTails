import React from "react";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import TrailCard from "./components/TrailCard";

class MyComponent extends React.Component {
  state = {
    response: []
  }
  }

  componentDidMount() {
    fetch("https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=107909830-f6c274fbda7e43ba889be3f1ccbe0c75")
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            response: data.trails
          });
          .catch(console.log)
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}
function TrailOptions() {
  return(
    <Wrapper>
      <Title>Trail Options</Title>
      <TrailCard
        name={response.trails[0].name}
        image={response.trails[0].imgMedium}
        length={response.trails[0].length}
        stars={response.trails[0].stars}
        condition={response.trails[0].condition}
      />
      <TrailCard
        name={response.trails[1].name}
        image={response.trails[1].imgMedium}
        length={response.trails[1].length}
        stars={response.trails[1].stars}
        condition={response.trails[1].condition}
      />
      <TrailCard
        name={response.trails[2].name}
        image={response.trails[2].imgMedium}
        length={response.trails[2].length}
        stars={response.trails[2].stars}
        condition={response.trails[2].condition}
      />
    </Wrapper>

  );
}
export default TrailOptions;