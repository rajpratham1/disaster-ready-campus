
import React from 'react';

type IconProps = {
    className?: string;
};

export const HomeIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 10.5v9A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 19.5v-9M12 21V12" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

export const PhoneIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);

export const XMarkIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const BellIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

export const LightBulbIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.184m-1.5.184a6.01 6.01 0 01-1.5-.184m1.5.184A2.25 2.25 0 0113.5 12H12m0 0A2.25 2.25 0 0010.5 12H12m0 0v-2.25m0 2.25c.621 0 1.125-.504 1.125-1.125S12.621 9.75 12 9.75S10.875 10.254 10.875 10.875 11.379 12 12 12zm0 0h2.25m-2.25 0h-2.25" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const CloudIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.666-5.113 5.25 5.25 0 00-10.332 2.313A4.5 4.5 0 002.25 15z" />
    </svg>
);

export const RainIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15h5.25a3.75 3.75 0 003.75-3.75V10.5A3.75 3.75 0 0015.75 6h-5.25zm.75 11.25-3.75-3.75m3.75 3.75-3.75-3.75M11.25 17.25l3.75-3.75m-3.75 3.75l3.75-3.75M8.25 14.25l3.75-3.75m-3.75 3.75l3.75-3.75" />
    </svg>
);

export const WindIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.125 1.125 0 010 2.25H5.625a1.125 1.125 0 010-2.25z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.125 18l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 011.423 1.423L19.375 18l-1.188.648a2.25 2.25 0 01-1.423 1.423z" />
    </svg>
);

export const LocationMarkerIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

export const EarthquakeIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.012 2.25c.533 0 1.025.18 1.414.502l6.25 5.25c.488.41.774.99.774 1.623v9.375c0 .994-.806 1.875-1.8 1.875H5.35c-.994 0-1.8-.88-1.8-1.875V9.625c0-.633.286-1.213.774-1.623l6.25-5.25c.389-.322.88-.502 1.414-.502zM12.012 4.5c-.266 0-.512.09-.707.251l-6.25 5.25a.75.75 0 00-.274.563v9.375c0 .248.202.45.45.45h13.3c.248 0 .45-.202.45-.45V9.625a.75.75 0 00-.274-.563l-6.25-5.25a.75.75 0 00-.707-.251z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25L3.75 16.5M12 11.25L20.25 16.5M12 21V11.25M6.75 18.75v-3.375M17.25 18.75v-3.375" />
    </svg>
);

export const FireIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.622a8.982 8.982 0 013.362-3.797z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.622a8.982 8.982 0 013.362-3.797zM15.362 5.214L15 5.25v.003l.362-.039zM12 21a8.25 8.25 0 005.962-13.952l-.362.038M9 12a3 3 0 116 0 3 3 0 01-6 0z" />
    </svg>
);

export const FloodIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.004v18.002c0 .621.504 1.125 1.125 1.125h5.25c.621 0 1.125-.504 1.125-1.125V3.004M6.75 4.504c0 .621.504 1.125 1.125 1.125h9c.621 0 1.125-.504 1.125-1.125M6.75 19.504c0 .621.504 1.125 1.125 1.125h9c.621 0 1.125-.504 1.125-1.125" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.756v4.488c0 .621.504 1.125 1.125 1.125h15.75c.621 0 1.125-.504 1.125-1.125V9.756" />
    </svg>
);

export const CycloneIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
    </svg>
);

export const TsunamiIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75l.935.31a11.94 11.94 0 0111.41 0l.935-.31m-13.28 0c.264-.09.531-.17.801-.248l.935-.31a11.94 11.94 0 0111.41 0l.935.31c.27.078.537.158.801.248m-13.28 0l-1.037.346a.75.75 0 00-.34 1.037l.422.633c.11.166.27.307.45.418l2.253 1.352a11.989 11.989 0 0011.41 0l2.253-1.352c.18-.11.34-.252.45-.418l.422-.633a.75.75 0 00-.34-1.037l-1.037-.346m-13.28 0l-.023.008a12.034 12.034 0 0011.41 0l-.023-.008" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.208 8.087c.264-.09.531-.17.801-.248l.935-.31a11.94 11.94 0 0111.41 0l.935.31c.27.078.537.158.801.248m-13.28 0l-1.037.346a.75.75 0 00-.34 1.037l.422.633c.11.166.27.307.45.418l2.253 1.352a11.989 11.989 0 0011.41 0l2.253-1.352c.18-.11.34-.252.45-.418l.422-.633a.75.75 0 00-.34-1.037l-1.037-.346m-13.28 0l-.023.008a12.034 12.034 0 0011.41 0l-.023-.008" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

export const ClipboardDocumentListIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M6.75 7.5h1.5v.75h-1.5v-.75zm.75 2.25h1.5v.75h-1.5v-.75zm.75 2.25h1.5v.75h-1.5v-.75zm.75 2.25h1.5v.75h-1.5v-.75zM6 13.5h3v.75h-3v-.75zm.75-3h3v.75h-3v-.75zm.75-3h3v.75h-3v-.75zm-3.75 9.75c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 011.123-.08m-5.801 0c.065.21.1.433.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M4.5 7.5A2.25 2.25 0 016.75 5.25h9.5A2.25 2.25 0 0118.5 7.5v9.5A2.25 2.25 0 0116.25 19.5h-9.5A2.25 2.25 0 014.5 17.25v-9.5z" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const MegaphoneIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.75a.75.75 0 01.75-.75h2.82a.75.75 0 01.75.75v1.875a.75.75 0 01-.75.75h-2.82a.75.75 0 01-.75-.75V3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75h.008v.008H12V6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l-3.86-3.86a.75.75 0 00-1.06 1.06l3.86 3.86a.75.75 0 001.06-1.06zM13.803 12.36l3.86-3.86a.75.75 0 00-1.06-1.06l-3.86 3.86a.75.75 0 001.06 1.06z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.603 16.196a3.375 3.375 0 01-1.08-2.296c0-1.862 1.513-3.375 3.375-3.375h.375a3.375 3.375 0 013.375 3.375c0 .92-.372 1.753-1.08 2.296M18.397 16.196a3.375 3.375 0 001.08-2.296c0-1.862-1.513-3.375-3.375-3.375h-.375a3.375 3.375 0 00-3.375 3.375c0 .92.372 1.753 1.08 2.296" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21c-1.354 0-2.62-.64-3.447-1.742a.75.75 0 011.06-1.06 1.875 1.875 0 002.387.165 1.875 1.875 0 00.6-.425M15 21c1.354 0 2.62-.64 3.447-1.742a.75.75 0 00-1.06-1.06 1.875 1.875 0 01-2.387.165 1.875 1.875 0 01-.6-.425" />
    </svg>
);

export const ExclamationTriangleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);
