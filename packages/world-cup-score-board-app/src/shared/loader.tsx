import { Spinner } from "../shared/spinner";

interface ILoaderProps {
  text?: string;
}

export const Loader = ({ text }: ILoaderProps) => (
  <div className="flex flex-col items-center justify-center text-3xl text-blue-500 pt-60">
    <h1>{text ? `${text}` : `Loading...`}</h1>

    <Spinner className="w-20 h-20 my-5" />
  </div>
);
