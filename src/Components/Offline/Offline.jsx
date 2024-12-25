import useOnline from "../../hooks/UseOnline";

export default function Offline({ children }) {
  let isOnline = useOnline();
  if (!isOnline) {
    return children;
  }
}
