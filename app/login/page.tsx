'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0); // State for carousel
  const router = useRouter();

  const images = [
    {
      src: '/login1.webp',
      alt: 'Image 1',
      caption: 'Caption 1',
      title: 'Domain Connection',
      description: (
        <>
          Connect your own custom domain to your job board for FREE;
          <br />
          receive up to 40% more click-throughs compared to unbranded links.
        </>
      ),
    },
    {
      src: '/login2.webp',
      alt: 'Image 2',
      caption: 'Caption 2',
      title: 'Easy Integration',
      description: (
        <>
          Seamlessly integrate with popular job board platforms.
          <br />
          Simplify your workflow with minimal setup time.
        </>
      ),
    },
    {
      src: '/login3.webp',
      alt: 'Image 3',
      caption: 'Caption 3',
      title: 'Analytics Dashboard',
      description: (
        <>
          Track your job board performance with real-time analytics.
          <br />
          Make data-driven decisions to improve your reach.
        </>
      ),
    },
    {
      src: '/login4.webp',
      alt: 'Image 3',
      caption: 'Caption 3',
      title: 'Analytics Dashboard',
      description: (
        <>
          Seamlessly integrate with popular job board platforms.
          <br />
          Simplify your workflow with minimal setup time.
        </>
      ),
    },
  ];

  // Auto-slide functionality for the carousel (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!email || !password) {
    toast.error("Please fill in all fields.");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }
  toast.success("Login successful!");
  router.push("/dashboard");
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--lighter-grey-hex)] px-4">
      <section className="w-full max-w-[1400px] xtraSmall:max-w-[300px] smallMobile:max-w-[360px] mobile:max-w-[400px] tablet:max-w-[900px] laptop:max-w-[1300px] h-auto tablet:h-[400px] laptop:h-[700px] flex flex-col tablet:flex-row rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <aside className="hidden tablet:flex w-full tablet:w-1/2 bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)] flex-col justify-start p-6 relative overflow-hidden">
          <header className="flex items-center space-x-2 mb-2">
            <img src="/icons/logo.png" alt="Logo" className="w-8 h-auto" />
           
          </header>
          <main className="max-w-3xl mx-auto mt-8 px-4">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-white leading-snug font-poppins">
              Your job board, now better than ever
              <br />
              <span>Explore what&apos;s new!</span>
            </h1>

            {/* Carousel Section */}
            <section className="flex flex-col justify-center items-center mt-6">
              <article className="rounded-xl shadow-lg p-2 w-full max-w-2xl h-80 relative overflow-hidden bg-white">
                {images.map((image, index) => (
                  <figure
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      currentImage === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
                    <figcaption className="text-center text-white mt-2 font-poppins text-sm">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </article>

              {/* Description below the image */}
              <div className="text-center mt-6">
                <h2 className="text-[var(--primary-white-hex)] text-2xl font-semibold font-poppins">{images[currentImage].title}</h2>
                <p className="text-[var(--primary-white-hex)] text-sm mt-2 font-poppins">{images[currentImage].description}</p>
              </div>

              {/* Navigation Dots BELOW the image */}
              <nav className="mt-4 flex space-x-3 justify-center">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-4 h-2 rounded-sm transition-all duration-300 ${
                      currentImage === index ? 'bg-[var(--primary-white-hex)] w-6' : 'bg-white/40 w-4'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    suppressHydrationWarning
                  />
                ))}
              </nav>
            </section>
          </main>
        </aside>

        {/* Right Section */}
        <section className="w-full tablet:w-1/2 bg-white p-4 smallMobile:p-6 tablet:p-8 flex flex-col laptop:max-h-screen max-h-[calc(100vh-4rem)]">
          <h3 className="text-2xl font-semibold text-left mb-1 font-poppins sticky top-0 bg-[var(--primary-white-hex)] z-10 pb-0 laptop:mt-[11.125rem]">
            Welcome Back to Work i9 Job Board
          </h3>
          <p className="text-sm text-[var(--medium-grey-hex)] mb-4 mt-0 font-poppins">
            Enter your email and password to access your account.
          </p>
          <form className="space-y-4 overflow-y-auto flex-1 scrollbar-hidden" onSubmit={handleSubmit}>
            {/* Email */}
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Email*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                placeholder="Enter your email"
                suppressHydrationWarning
              />
            </fieldset>

            {/* Password */}
            <fieldset>
              <label className="block text-sm font-medium text-[var(--primary-black-hex)] mb-0.5 font-poppins">Password*</label>
              <span className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-1.5 border border-[var(--lighter-gray-hex)] rounded-lg focus:outline-none text-sm font-poppins"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--primary-black-hex)]"
                  suppressHydrationWarning
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </span>
            </fieldset>

            <button
              type="submit"
              className="w-full bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)] py-1.5 rounded-lg transition text-sm font-poppins"
              suppressHydrationWarning
            >
              Login
            </button>
            <p className="mt-3 text-center text-sm text-[var(--medium-grey-hex)] font-poppins">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-[var(--primary-blue-hex)] font-semibold hover:underline">
                Register
              </a>
            </p>
          </form>
        </section>
      </section>
    </main>
  );
};

export default Login;