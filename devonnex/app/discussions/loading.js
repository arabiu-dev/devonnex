import { BeatLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <BeatLoader
      color="#635fc7"
      margin={5}
      loading={true}
      speedMultiplier={6}
      cssOverride={{ textAlign: "center", marginTop: "20vh" }}
    />
  );
}
