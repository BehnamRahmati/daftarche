import HomeFooter from '@/ui/HomeFooter';
import HomeHeader from '@/ui/HomeHeader';
import Link from 'next/link';

export default async function Home() {
	return (
		<>
			<HomeHeader />
			<main>
				<section
					id='get-started'
					className='container mx-auto py-20'>
					<div className='bg-gray-200 md:rounded-xl flex flex-col lg:flex-row items-center p-10 gap-10'>
						<div className='flex flex-col gap-3'>
							<h1 className='text-5xl leading-20'>Daftarche App</h1>
							<div className='w-full lg:w-1/2'>
								An app to save your clipboards and files in cloud to make them accessible from
								all your devices
							</div>
							<Link
								href={'/daftarche'}
								className='px-7 py-2 border rounded-xl w-fit hover:bg-white'>
								{' '}
								Get Started{' '}
							</Link>
						</div>
						<div className='w-full lg:w-1/2 bg-white rounded-xl h-72'>pics</div>
					</div>
				</section>

				<section
					id='about'
					className='py-20 container mx-auto '>
					<h2 className='text-3xl font-bold text-center mb-10'>about</h2>
					<div className='flex flex-col lg:flex-row gap-5 p-5 lg:p-0'>
						<div className='bg-gray-200 w-full lg:w-1/3 h-72 rounded-xl p-5'>picture</div>
						<div className='border w-full lg:w-2/3 h-72 rounded-xl p-5'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat saepe
							necessitatibus ut, fuga possimus quisquam animi. Dolorem nemo sed placeat officia
							sequi inventore hic? Libero est nihil magnam tempore.
						</div>
					</div>
				</section>

				<section
					id='projects'
					className='bg-gray-200 min-h-96 py-10'>
					<h2 className='text-3xl font-bold text-center mb-10'>projects</h2>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-5 container mx-auto p-5 lg:p-0'>
						{[...new Array(8)].map((arr) => {
							return <div key={arr} className='h-40 bg-white p-5 rounded-xl'>project</div>;
						})}
					</div>
				</section>

				<section
					id='contact'
					className='py-20 container mx-auto '>
					<h2 className='text-3xl font-bold text-center mb-10'>contact</h2>
					<div className='flex flex-col lg:flex-row gap-5 p-5 lg:p-0'>
						<div className='bg-gray-200 w-full lg:w-1/3 h-72 rounded-xl p-5'>picture</div>
						<div className='border w-full lg:w-2/3 h-72 rounded-xl p-5'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat saepe
							necessitatibus ut, fuga possimus quisquam animi. Dolorem nemo sed placeat officia
							sequi inventore hic? Libero est nihil magnam tempore.
						</div>
					</div>
				</section>
			</main>
			<HomeFooter />
		</>
	);
}
