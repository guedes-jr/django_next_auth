import Image from 'next/image';
import React from 'react';
import imageLoading from '@public/img/loading.gif';

export default function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6rem'}}>
      <Image src={imageLoading.src} alt="loading" width={250} height={250} />
    </div>
  );
};