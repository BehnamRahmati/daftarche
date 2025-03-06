'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import React from 'react';

export default function DashboardSlider() {
	return (
		<div className='mt-5'>
			<Swiper
				slidesPerView={2}
				spaceBetween={24}>
				{[...new Array(4)].map((_, i) => (
					<SwiperSlide key={'ds' + i}>
						<div className='border border-zinc-200 dark:border-[var(--secondary-heavy)] rounded-3xl bg-white dark:bg-[var(--foreground)] h-48'></div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
