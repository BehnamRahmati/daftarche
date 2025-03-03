
import { FiHome, FiClipboard, FiFile, FiMessageCircle } from "react-icons/fi";
import Sidebarlink from "./Sidebarlink";

export default function Sidebar() {
	return (
		<aside className='shrink-0 lg:min-h-dvh flex flex-col w-full lg:w-3xs px-3 lg:px-5 py-10'>
			<div className='logo text-3xl font-bold text-center italic underline underline-offset-4'>
				Daftarche
			</div>
			<nav className='flex lg:flex-col flex-1 lg:flex-none gap-1 mt-10 rounded-xl overflow-hidden border lg:border-0 border-gray-200'>
				<Sidebarlink link='/daftarche' text='Home'>
					<FiHome size={20} />
				</Sidebarlink>

				<Sidebarlink link='/daftarche/clipboard' text='Clipboard'>
					<FiClipboard size={20} />
				</Sidebarlink>

				<Sidebarlink link='/daftarche/file' text='Files'>
					<FiFile size={20} />
				</Sidebarlink>

				<Sidebarlink link='/daftarche/chat' text='Chat'>
					<FiMessageCircle size={20} />
				</Sidebarlink>
			</nav>

		</aside>
	);
}
