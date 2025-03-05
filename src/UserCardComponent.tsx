import { Avatar } from '@material-tailwind/react';
import coins from './assets/coins.svg';
import user from './assets/user.jpg';

interface UserCardProps {
	name: string;
	balance: string;
	isSelected: boolean;
	selectionColor: 'azul' | 'verde' | 'vermelho' | 'padrao';
	onSelect: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
	name,
	balance,
	isSelected,
	selectionColor,
	onSelect,
}) => {
	const getCardColor = () => {
		if (!isSelected)
			return 'bg-principal-5 border-principal-6 hover:scale-105 hover:border-blue-gray-50';
		if (selectionColor === 'verde') return 'bg-principal-5 border-green-400 scale-105';
		if (selectionColor === 'vermelho') return 'bg-principal-5 border-red-400 scale-105';
		if (selectionColor === 'azul') return 'bg-principal-5 border-blue-400 scale-105';
		return 'bg-principal-5 border-principal-6'; // Default
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			onClick={onSelect}
			className={`flex flex-row items-center border-2 rounded-xl p-2 gap-2 transition-all cursor-pointer min-w-64 max-w-72 ${getCardColor()}`}
		>
			<Avatar
				src={user}
				alt="avatar"
				className="border-2 border-principal-6 outline-none"
				variant="rounded"
				size="xl"
				placeholder={undefined}
				onPointerEnterCapture={undefined}
				onPointerLeaveCapture={undefined}
			/>
			<div className="flex w-full flex-col gap-1 text-white">
				<p>{name}</p>
				<div className="flex flex-row items-center bg-principal-0 rounded-lg p-1 gap-2">
					<img src={coins} className="max-w-5" alt="Moedas" />
					<p>{balance}</p>
				</div>
			</div>
		</div>
	);
};
