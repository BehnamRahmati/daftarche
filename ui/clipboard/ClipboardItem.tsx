'use client';
import React, { useLayoutEffect } from 'react';
import { FiEdit, FiCopy, FiMoreHorizontal } from 'react-icons/fi';
import ClipboardDeleteButton from './ClipboardDeleteButton';
import ClipboardEditForm from './ClipboardEditForm';
import Dropdown from 'rc-dropdown';
import ClipboardActionDropdown from './molecules/dropdowns/ClipboardActionDropdown';

function ClipboardItem({ text, id }: { text: string; id: string }) {
	const [editMode, setEditMode] = React.useState(false);
	const [responsive, setResponsive] = React.useState(false);
	// handle copy to clipboard
	const handleCopy = React.useCallback(async () => {
		console.warn('handleCopy rendered');
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.log('failed to copy to clipboard');
		}
	}, []);

	// checking device width for responsive rendering
	useLayoutEffect(() => {
		const dvw = window.innerWidth;
		if (dvw < 1024) {
			setResponsive(true);
		}
	}, []);

	return (
		<div className={classnames.clipboardItem}>
			{/* clipboard item content */}
			<div className='w-4/5 truncate'>
				{editMode ? (
					<ClipboardEditForm
						id={id}
						text={text}
						setEditMode={setEditMode}
					/>
				) : (
					<p>{text}</p>
				)}
			</div>

			{/* clipboard item actions */}
			{responsive ? (
				// action dropdown responsive
				<Dropdown
					trigger={['click']}
					animation='slide-up'
					overlay={
						<ClipboardActionDropdown
							id={id}
							handleCopy={handleCopy}
							setEditMode={setEditMode}
						/>
					}>
					<button
						type='button'
						className={classnames.actionButton}>
						action
						<FiMoreHorizontal size={20} />
					</button>
				</Dropdown>
			) : (
				// action buttons desktop
				<div className='w-1/5 hidden lg:flex items-center justify-center gap-3 *:cursor-pointer'>
					<FiEdit
						size={20}
						onClick={() => setEditMode(!editMode)}
					/>
					<FiCopy
						onClick={() => handleCopy()}
						size={20}
					/>
					<ClipboardDeleteButton id={id} />
				</div>
			)}
		</div>
	);
}

const classnames = {
	clipboardItem: 'flex *:px-3 lg:*:px-5 *:py-3 w-full odd:bg-zinc-200 odd:dark:bg-[var(--foreground)] rounded-xl',
	actionButton: 'text-[0px] leading-0 flex justify-center w-1/5',
};
export default React.memo(ClipboardItem);
