import styled from "@emotion/styled";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import HeaderContainer from "./header/header.container";
import Footer from "./footer/footer.presenter";

const Body = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

interface ILayoutProps {
  children: ReactNode;
}

const HIDDEN_HEADERS = [
  "/",
  "/login/",
  "/join/",
  "/settimeout/",
  "/map/",
  "/boards/",
];
const HIDDEN_FOOTER = ["/login/", "/join/", "/settimeout/", "/map/"];

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);
  const isHiddenFooter = HIDDEN_FOOTER.includes(router.asPath);

  return (
    <>
      {/* {!isHiddenHeader && <LayoutHeader />} */}
      {!isHiddenHeader && <HeaderContainer />}
      <Body>{props.children}</Body>
      {!isHiddenFooter && <Footer />}
    </>
  );
}
