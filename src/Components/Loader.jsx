import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrapper>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Loader;
