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
    <div className="flex flex-col gap-4">
      {/* Title Section */}
      <h3 className="font-semibold text-sm text-primary-text-light dark:text-primary-text-dark">
        {title}
      </h3>

      {/* Description Section */}
      <p className="text-xs text-secondary-text-light dark:text-secondary-text-dark">
        {description}
      </p>

      {/* Form Section */}
      <form className="flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="email"
          placeholder="you@domain.com"
          className="w-full px-4 py-2 rounded-md bg-secondary-background-light text-primary-text-light placeholder-secondary-text-light focus:outline-none focus:ring-2 focus:ring-primary-border-light dark:bg-secondary-background-dark dark:text-primary-text-dark dark:placeholder-secondary-text-dark dark:focus:ring-primary-border-dark"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary-background-light text-primary-text-light rounded-md hover:bg-primary-active-light dark:bg-primary-background-dark dark:text-primary-text-dark dark:hover:bg-primary-active-dark"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
