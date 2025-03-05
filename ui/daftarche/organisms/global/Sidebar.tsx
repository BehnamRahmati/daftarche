import React from 'react';
import SidebarMenu from '../../molecules/SidebarMenu';

function Sidebar() {
	return (
		<aside className='shrink-0 lg:min-h-dvh flex flex-col px-3 lg:px-5 py-10 '>
			<SidebarMenu />
		</aside>
	);
}

export default React.memo(Sidebar)
