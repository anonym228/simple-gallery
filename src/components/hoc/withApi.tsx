import React from "react";
import axios from "axios";
import { apiUrl } from "../../constants/default";
export interface ImageInterface {
  id: number;
  url: string;
}

interface IState {
  apiUrl?: string;
  images: ImageInterface[];
}

function Api<T>(Component: React.ComponentType<T>) {
  return class withApi extends React.Component<{}> {
    state: IState = {
      apiUrl: apiUrl,
      images: []
    };

    componentDidMount() {
      this.get();
    }

    get = async () => {
      try {
        const { data } = await axios.get(`${this.state.apiUrl}/images`);
        this.setState({ images: data });
      } catch (error) {
        alert(error);
      }
    };

    render() {
      const { ...props } = this.props;
      return <Component {...(props as T)} images={this.state.images} />;
    }
  };
}

export default Api;
