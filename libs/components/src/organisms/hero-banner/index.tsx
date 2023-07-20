import { FC, ReactElement } from 'react';
import { TbannerProps } from './type';
import { Reveal, Button } from '../../atoms';

export const HeroBanner: FC<TbannerProps> = ({
  heroTitle,
  heroTitle2,
  heroTitleBottomRight,
  heroImages,
  backgrounColor,
  subTitle,
  subTitle2,
  isDownload = false,
  blur = false,
}): ReactElement => {
  return (
    <header
      className={`bg-center ${backgrounColor} flex justify-center items-center relative bg-fixed object-center bg-cover lg:w-full h-auto bg-no-repeat bg-blend-overlay`}
      style={{
        backgroundImage: `url(${heroImages})`,
      }}
    >
      <section
        className={`px-4 mx-auto w-full h-full ${
          blur ? 'backdrop-blur-sm' : ''
        } text-center py-24 lg:py-52`}
      >
        <Reveal w="w-full" blur={blur}>
          <div className="flex items-center flex-col w-full">
            <div className="text-lg sm:text-xl md:text-4xl xl:text-5xl py-4 font-black text-primary-white leading-normal uppercase lg:pt-10 pt-40">
              {subTitle}
            </div>
            <h2 className="mb-8 text-lg md:text-3xl xl:text-4xl font-semibold text-primary-white">
              {heroTitle}
            </h2>
            <h1 className="mb-4 text-lg sm:text-xl md:font-medium lg:font-bold md:text-3xl lg:text-5xl text-primary-white relative bottom-4">
              {heroTitle2}
            </h1>
            <p className="text-lg md:text-3xl text-primary-white font-bold">
              {subTitle2}
            </p>
            <div className="flex flex-col text-2xl md:text-5xl text-primary-white absolute left-0 lg:left-24 bottom-0 gap-2 font-black">
              {heroTitleBottomRight}
              <div
                className={`border-2 border-primary-green w-36 ${
                  heroTitleBottomRight ? 'block' : 'hidden'
                }`}
              ></div>
            </div>
            {isDownload ? (
              <section className="flex mt-12 gap-8">
                <Button
                  href="https://pmb.uninus.ac.id/wp-content/uploads/2023/03/Brosur-Program-Sarjana.pdf"
                  variant="outlined"
                  styling="border-primary-white "
                  size="lg"
                >
                  Unduh Brosur
                </Button>
                <Button href="/auth/register" variant="filled" size="lg">
                  Daftar Sekarang
                </Button>
              </section>
            ) : null}
          </div>
        </Reveal>
      </section>
    </header>
  );
};
