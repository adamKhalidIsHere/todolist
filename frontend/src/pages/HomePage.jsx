import { useUserStore } from "../stores/useUserStore";
import AuthorizedHomePage from "./AuthorizedHomePage";
import UnauthorizedHomePage from "./UnauthorizedHomePage";

const HomePage = () => {
  const { user } = useUserStore();
  return <>{user ? <AuthorizedHomePage /> : <UnauthorizedHomePage />}</>;
};
export default HomePage;
