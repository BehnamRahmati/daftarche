import Sidebarlink from '@/ui/daftarche/molecules/Sidebarlink';
import { FiHome, FiClipboard, FiFile, FiMessageCircle } from 'react-icons/fi';

export default function Sidebar({ lang }: { lang: 'fa' | 'en' }) {
	return (
		<aside className='shrink-0 lg:min-h-dvh flex flex-col w-full lg:w-3xs px-3 lg:px-5 py-10'>
			<div className='logo text-3xl font-bold text-center italic underline underline-offset-4'>
				{lang === 'fa' ? 'دفترچه' : 'Daftarche'}
			</div>
			<nav className='flex lg:flex-col flex-1 lg:flex-none gap-1 mt-10 rounded-xl overflow-hidden border lg:border-0 border-gray-200'>
				<Sidebarlink
					link='/daftarche'
					text='Home'
					faText='خانه'>
					<FiHome size={20} />
				</Sidebarlink>

				<Sidebarlink
					link='/daftarche/clipboard'
					text='Clipboard'
					faText='کلیپ بورد'>
					<FiClipboard size={20} />
				</Sidebarlink>

				<Sidebarlink
					link='/daftarche/file'
					text='Files'
					faText='فایل'>
					<FiFile size={20} />
				</Sidebarlink>

				<Sidebarlink
					link='/daftarche/chat'
					text='Chat'
					faText='چت'>
					<FiMessageCircle size={20} />
				</Sidebarlink>
			</nav>
		</aside>
	);
}
