// Página feed (/principal)
// Aquí puedes programar lo que quieras
import FooterButtons from "../components/Footer";
import HeaderTitle from "../components/header";
import PostList from "../components/PostList";

export default function Feed() {
  return (
    <>
      <HeaderTitle />
      <PostList />
      <FooterButtons />
    </>
  );
}