import useOnline from "../../hooks/UseOnline";

export default function Online({ children }) {
  let isOnline = useOnline();
  if (isOnline) {
    return children;
  }
}
