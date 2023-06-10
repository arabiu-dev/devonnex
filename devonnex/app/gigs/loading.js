import { BeatLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <BeatLoader
      color="var(--coral)"
      margin={5}
      loading={true}
      cssOverride={{ textAlign: "center", marginTop: "10vh" }}
    />
  );
}
