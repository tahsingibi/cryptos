import { ArrowPathIcon } from '@heroicons/react/20/solid';

export default function Loader({ className, text }) {
  const classes = `gap-2 animate-pulse flex align-center justify-center ${className}`;

  return (
    <div className={classes}>
      <ArrowPathIcon className="size-6 animate-spin !text-zinc-400" />
      <span>{text}</span>
    </div>
  );
}
