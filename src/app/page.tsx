import { ThemeSwitcher } from "./_components/theme-switcher";
import LayoutToggle from "./_components/layout-toggle";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <section>
        <h1 className="text-4xl font-bold mb-2">Welcome to My Website</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          This is a basic layout using Next.js 13, Tailwind CSS, and React components.
        </p>
      </section>

 <section>
        <LayoutToggle />
      </section>

      {/* Theme Switcher */}
      <section>
        <ThemeSwitcher />
      </section>

      {/* A few paragraphs of text to show scrolling */}
      <section className="space-y-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam,
          vitae. Praesentium corporis doloremque, perferendis nobis omnis
          reiciendis porro dolorem quia laudantium pariatur ratione nemo
          obcaecati deserunt rerum aliquid. Ad, cumque?
        </p>
        <p>
          Quasi labore inventore culpa officiis? Unde iure architecto
          consequuntur, illo quos provident soluta quidem mollitia. Mollitia
          veritatis quas fugit quam, quis ex. Corporis rem voluptatibus sunt
          amet iure quos laborum?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
          possimus repellendus, unde impedit eaque earum? Ad, nobis veniam,
          ex quibusdam perferendis quidem autem vero quasi vel odit
          dignissimos! Dolorem, dolore.
        </p>
      </section>

      {/* Example grid section (cards) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow">
            <h3 className="text-lg font-medium mb-2">Card One</h3>
            <p className="text-sm">
              This is some placeholder content for the first card. Lorem ipsum dolor sit amet.
            </p>
          </article>
          <article className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow">
            <h3 className="text-lg font-medium mb-2">Card Two</h3>
            <p className="text-sm">
              Another example card. Add more text or images to see how it all fits.
            </p>
          </article>
          <article className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow">
            <h3 className="text-lg font-medium mb-2">Card Three</h3>
            <p className="text-sm">
              Here’s the third card for demonstration. It’s styled similarly for consistency.
            </p>
          </article>
        </div>
      </section>

      {/* Another paragraph block to force more scrolling */}
      <section className="space-y-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          pharetra fermentum consectetur. Vivamus vulputate tristique tortor,
          vitae molestie augue semper nec. Cras fermentum interdum tortor
          quis feugiat. Nam ut tortor a ante semper auctor vel vel nibh.
        </p>
        <p>
          Praesent imperdiet, neque vel laoreet viverra, velit ligula dictum
          magna, sit amet interdum enim quam sed lorem. Etiam consectetur,
          justo id volutpat suscipit, mauris nulla commodo enim, vitae
          gravida purus nisi at diam.
        </p>
        <p>
          Integer consequat lorem vitae dolor tristique, a fermentum tellus
          vestibulum. Vivamus porta finibus ullamcorper. Fusce in purus sem.
          Mauris neque libero, blandit eget ligula sed, imperdiet volutpat
          ipsum.
        </p>
      </section>
    </div>
  );
}
