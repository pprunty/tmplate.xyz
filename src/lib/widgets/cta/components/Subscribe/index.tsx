'use client';

interface SubscribeProps {
  title?: string;
  description?: string;
}

const Subscribe: React.FC<SubscribeProps> = ({
  title = 'Subscribe to our newsletter',
  description = 'Stay updated on new releases and features.',
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Title Section */}
      <h3 className="font-semibold text-sm text-primary-text-light dark:text-primary-text-dark">
        {title}
      </h3>

      {/* Description Section */}
      <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark">
        {description}
      </p>

      {/* Form Section */}
      <form className="flex flex-col gap-2">
        {/* Container for input + button */}
<div className="relative w-full">
  <input
    type="email"
    placeholder="you@domain.com"
    className="
      w-full
      px-4
      py-2
      pr-24
      rounded-md
      sm:text-xs
      text-sm
      bg-secondary-background-light
      text-primary-text-light
      placeholder-secondary-text-light
      focus:outline-none
      focus:ring-2
      focus:ring-primary-border-light
      dark:bg-secondary-background-dark
      dark:text-primary-text-dark
      dark:placeholder-secondary-text-dark
      dark:focus:ring-primary-border-dark
    "
  />
  <button
    type="submit"
    className="
      absolute
      top-0
      right-0
      h-full
      px-4          /* Horizontal padding */
      py-1          /* Vertical padding */
      text-xs       /* Make text smaller */
      rounded-r-md
      bg-primary-background-light
      text-primary-text-light
      hover:bg-primary-active-light
      dark:bg-primary-background-dark
      dark:text-primary-text-dark
      dark:hover:bg-primary-active-dark
      transition-colors
    "
  >
    Subscribe
  </button>
</div>
      </form>
    </div>
  );
};

export default Subscribe;
