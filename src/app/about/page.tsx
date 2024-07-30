//this is an about us page component with image tag at top with rounded border
export default function AboutUsPage() {
  return (
    <>
      <div className="text-bold flex items-center justify-center pl-14 text-2xl">
        <h1 className="mb-4 text-4xl font-extrabold text-lime-500 md:text-5xl">
          Sustainability as Sway!
        </h1>
      </div>

      <p className="text-md mb-6 pl-14 font-light">
        At Sway, sustainability is at the heart of everything we do. Our brand
        identity, characterized by its simplicity and elegance, is a reflection
        of our commitment to a more sustainable future.
      </p>

      <div className={`flex items-center justify-center pb-10`}>
        <img
          src={`https://sway.club/wp-content/uploads/2024/04/big-pic-sustainability-2.png`}
          className={`rounded-md`}
          alt={`about-us`}
        />
      </div>

      <div className="pb-6 pl-8 pr-8">
        <div className="card flex bg-base-100 shadow-xl lg:card-side">
          <figure>
            <img
              src="https://www.intheblouse.com/wp-content/uploads/elementor/thumbs/Untitled-design-2023-05-16T200459.916-1-qqqhbo3pschrn5ftvlj322ofvdshlb84r0gf4vpn50.png"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="mb-6 text-xl text-lime-500">Minimalism</h2>
            <p className="text-md mb-6 text-white">
              We believe less is more.Our thoughtfully design pieces embrace
              minimalism ensuring that garment becomes a versatile and timeless
              addition to your wardrobe and it will be worth.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-6 pl-8 pr-8">
        <div className="card bg-base-100 shadow-xl lg:card-side">
          <figure>
            <img
              src="https://commonobjective-uploads.storage.googleapis.com/images/wysiwyg/Circular-design-1-f60.png"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="mb-6 text-xl text-lime-500">Circular</h2>
            <p className="text-md mb-6 text-white">
              We believe less is more. Our thoughtfully design pieces embrace
              minimalism ensuring that garment becomes a versatile and timeless
              addition to your wardrobe. by choosing quality over quantity, we
              encourage conscious consumption.Each piece in our collection is
              the result of meticulous consideration and design.We value our
              environment and we are committed to circular design.We are the
              change we want to see in the world.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-6 pl-8 pr-8">
        <div className="card bg-base-100 shadow-xl lg:card-side">
          <figure>
            <img
              src="https://media.licdn.com/dms/image/C4E12AQFe-WCoAcH3CA/article-cover_image-shrink_720_1280/0/1623837593233?e=1726099200&v=beta&t=HdUjF8sBIFk1dQ5ugjWNrrpiNIdGOe3_RgYj0A7bKSk"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="mb-6 text-xl text-lime-500">Ethical</h2>
            <p className="text-md mb-6 text-white">
              Every stitch tells a story. Our garments are meticulously crafted
              by skilled artisans who share our values of ethical and fair labor
              practices. This dedication to craftsmanship not only ensures
              exceptional quality but also supports a network of talented
              individuals.Stay positive! Slay and Sway!.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-6 pl-8 pr-8">
        <div className="card bg-base-100 shadow-xl lg:card-side">
          <figure>
            <img
              src="https://assets.isu.pub/document-structure/240613082405-72bf47b98fe677306cdacec3dc0b43e6/v1/c05e9e0b0d8c88cd4d091afadd78e8b7.jpeg"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="mb-6 text-xl text-lime-500">Transparency</h2>
            <p className="text-md mb-6 text-white">
              We value openness and transparency. We’re on a journey to
              continuously improve our practices, and we’re committed to sharing
              our progress with you. From sourcing to production, we want you to
              know the story behind each piece you wear. we are updating all
              information very six months.we are committed to transparency and
              accountability.we want you to know the story behind each piece you
              wear.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-6 pl-8 pr-8">
        <div className="card bg-base-100 shadow-xl lg:card-side">
          <figure>
            <img
              src="https://assets.isu.pub/document-structure/240613082405-72bf47b98fe677306cdacec3dc0b43e6/v1/c05e9e0b0d8c88cd4d091afadd78e8b7.jpeg"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="mb-6 text-xl text-lime-500">
              Eco - Freindly Materials
            </h2>
            <p className="text-md mb-6 text-white">
              We are dedicated to reducing our environmental impact. Our
              clothing is made using sustainable materials, carefully sourced to
              minimize harm to the planet. From organic fabrics to innovative
              recycled materials, we aim to leave a lighter footprint.we are
              also using eco-friendly packaging.Our aim is to leave a lighter
              footprint on the planet.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
