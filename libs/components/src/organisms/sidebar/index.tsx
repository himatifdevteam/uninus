'use client';
import { FC, ReactElement, useState, useMemo } from 'react';
import Image from 'next/image';
import { TSideBarProps, TSideBarList } from './type';
import { AiFillHome, AiOutlineFileDone, AiOutlineLogout } from 'react-icons/ai';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../../atoms';
import dummyImage from '../../atoms/illustrations/dummy/dummy-avatar.jpg';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export const SideBar: FC<TSideBarProps> = ({
  profileName = '',
  profileEmail = '',
  onLogout,
}): ReactElement => {
  const [onToogle, setOnToogle] = useState<boolean>(false);
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const getData = () => userName;

  const dataUser = useMemo(() => {
    return getData();
  }, [userName]);

  const sideLists: TSideBarList[] = [
    { label: 'homepage', link: '/dashboard', icon: <AiFillHome /> },
    { label: 'data diri', link: '/dashboard/biodata', icon: <FaRegUser /> },
    {
      label: 'pendaftaran',
      link: '/dashboard/pendaftaran',
      icon: <AiOutlineFileDone />,
    },
    {
      label: 'riwayat',
      link: '/dashboard/riwayat',
      icon: <AiOutlineFileDone />,
    },
  ];
  const pathname = usePathname();
  return (
    <>
      {/* Desktop */}
      <div className="h-screen lg:relative fixed z-[99999] bg-sky-3 ">
        <aside
          className={`sm:hidden h-full top-0 left-0 flex z-50  shadow-lg lg:relative transition-transform 2xl:w-80  -translate-x-full lg:sm:translate-x-0 w-[240px] md:flex  bg-grayscale-1 py-10`}
        >
          <section
            className={` w-full flex flex-col items-center 2xl:gap-y-6 gap-y-2 `}
          >
            <h1 className="text-secondary-green-4 text-lg font-semibold 2xl:text-xl">
              PMB UNINUS
            </h1>

            <figure className="flex flex-row gap-x-2 ">
              <Image
                className="rounded-full "
                src={dummyImage}
                alt="profile picture"
                width={50}
                height={50}
                priority={true}
              />
              <figcaption className="text-center flex flex-col gap-y-3 mt-3  ">
                <div className=" text-sm text-secondary-green-4 p-2 font-bold rounded-md leading-[14px]">
                  <h3>{dataUser}</h3>
                </div>
              </figcaption>
            </figure>
            {/* Status pendaftaran */}
            <div className="2xl:w-2/5 w-1/2 mt-2 bg-red-5 text-primary-white p-2 rounded-md text-center text-xs">
              Belum Mendaftar
            </div>
            {/* End Status pendaftaran */}

            <div className="w-[60%]  px-3 h-[1px] my-6  bg-slate-4"></div>
            <div className="2xl:flex 2xl:flex-col 2xl:justify-between 2xl:h-full">
              <nav>
                <ul className="flex flex-col gap-y-6 lg:gap-y-4">
                  {sideLists.map((sideList, idx, arr) => (
                    <li key={idx} className="flex flex-col gap-y-6">
                      <Link
                        href={sideList.link}
                        role="link"
                        className={`flex gap-x-3 text-lg capitalize ${
                          pathname === sideList.link &&
                          'bg-primary-white drop-shadow-md '
                        }hover:bg-primary-white hover:shadow-md hover:text-secondary-green-1 items-center p-2 rounded-md`}
                      >
                        <p
                          className={`${
                            pathname === sideList.link &&
                            'bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg  text-primary-white'
                          } text-primary-green w-fit h-fit p-3 hover:bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg  hover:text-primary-white bg-primary-white drop-shadow-md rounded-lg`}
                        >
                          {sideList.icon}
                        </p>
                        <p className="text-primary-green text-md font-normal">
                          {sideList.label}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="ml-2 lg:mt-14 hover:shadow-md  text-primary-green font-normal rounded-md">
                <Button
                  variant="sidebarbutton"
                  size="sm"
                  styling="text-xl -ml-4 mt-0 items-center flex"
                  onClick={onLogout}
                >
                  <AiOutlineLogout
                    size={43}
                    className="mr-3 text-primary-green w-fit p-2 drop-shadow-lg bg-primary-white rounded-lg "
                  />
                  Log out
                </Button>
              </div>
            </div>
          </section>
        </aside>

        {/* mobile */}
        <Button
          variant="text-icon"
          styling="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-primary-white fixed z-50 inline-flex items-center text-primary-white top-5/6 flex bottom-10 right-8 rounded-md lg:hidden self-end justify-end items-end "
        >
          <BiMenuAltLeft
            className="mx-autotext-center cursor-pointer text-grayscale-3"
            size={30}
            onClick={() => setOnToogle(!onToogle)}
          />
        </Button>

        {onToogle && (
          <motion.aside
            className={` h-full top-0 w-60 left-0 shadow-lg absolute z-50 lg:relative duration-75  transition-transform lg:sm:translate-x-0 bg-grayscale-1 py-10`}
            aria-label="Sidebar"
            initial={
              onToogle
                ? { opacity: 0, translateX: -50 }
                : { opacity: 1, translateX: 0 }
            }
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
          >
            <section className={` w-full flex flex-col items-center  gap-y-6`}>
              <h1 className="text-secondary-green-4 text-lg font-bold">
                PMB UNINUS
              </h1>
              <div className="flex flex-row  items-center gap-x-6">
                <figure className="flex flex-row">
                  <Image
                    className="rounded-full mx-auto"
                    src={dummyImage}
                    alt="profile picture"
                    width={50}
                    height={50}
                    priority={true}
                  />
                  <figcaption className="text-center flex flex-col gap-y-2 mt-3  ">
                    <div className=" text-xs text-secondary-green-4 p-2 font-bold rounded-md leading-[14px]">
                      <h3>{session?.user?.name}</h3>
                    </div>
                    {/* <div>
                      <h1 className="font-semibold capitalize">
                        {session?.user?.name}
                      </h1>
                      <p className="font-base text-sm">
                        {session?.user?.email}
                      </p>
                    </div> */}
                  </figcaption>
                </figure>
              </div>
              {/* Status pendaftaran */}
              <div className="2xl:w-2/5 w-1/2 mt-2 bg-red-5 text-primary-white p-2 rounded-md text-center text-xs">
                Belum Mendaftar
              </div>
              {/* End Status pendaftaran */}
              <div className="w-[60%]  px-3 h-[1px] bg-slate-4"></div>
              <nav>
                <ul className="flex flex-col gap-y-6">
                  {sideLists.map((sideList, idx, arr) => (
                    <li key={idx} className="flex flex-col gap-y-6">
                      <Link
                        href={sideList.link}
                        role="link"
                        className={`flex gap-x-3 text-lg capitalize ${
                          pathname === sideList.link &&
                          'bg-primary-white drop-shadow-md '
                        }hover:bg-primary-white   hover:text-secondary-green-1 items-center p-2  rounded-md`}
                      >
                        <p
                          className={`${
                            pathname === sideList.link &&
                            'bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg  text-primary-white'
                          } text-primary-green w-fit h-fit p-3 bg-primary-white drop-shadow-md rounded-lg`}
                        >
                          {sideList.icon}
                        </p>
                        <p className="text-primary-green text-sm font-normal">
                          {sideList.label}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex text-2xl w-40% items-start my-8 py-2 rounded-md">
                <Button
                  variant="sidebarbutton"
                  size="sm"
                  styling="text-sm font-normal text-primary-green mt-0 p-0"
                  onClick={onLogout}
                >
                  <AiOutlineLogout
                    size={45}
                    className="mr-3 text-primary-green w-fit p-3 drop-shadow-lg bg-primary-white rounded-lg "
                  />
                  Log out
                </Button>
              </div>
            </section>
          </motion.aside>
        )}
      </div>
    </>
  );
};
