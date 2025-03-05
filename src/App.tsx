import { useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdOutlineWrapText } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
import { BiTransferAlt } from 'react-icons/bi';
import { UserCard } from './UserCardComponent';
import logo from './assets/monopoly-logo.svg';
import { NewGameComponent } from './NewGameComponent';

interface Player {
	name: string;
	balance: number;
}

function App() {
	const [open, setOpen] = useState(false);
	const [players, setPlayers] = useState<Player[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
	const [inputValue, setInputValue] = useState<string>('');

	const handleOpen = () => setOpen((prev) => !prev);

	const toggleSelection = (name: string) => {
		setSelectedUsers((prev) => {
			const newSelection = new Set(prev);
			newSelection.has(name) ? newSelection.delete(name) : newSelection.add(name);
			return newSelection;
		});
	};

	const formatCurrency = (value: number, locale = 'pt-BR', currency = 'BRL') => {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currency,
		}).format(value);
	};

	const getSelectionColor = (name: string) => {
		const selectedArray = Array.from(selectedUsers);
		if (selectedArray.length === 1) {
			return selectedArray[0] === name ? 'azul' : 'padrao';
		}
		if (selectedArray.length === 2) {
			return selectedArray[0] === name
				? 'verde'
				: selectedArray[1] === name
					? 'vermelho'
					: 'padrao';
		}
		return 'padrao';
	};

	const handleRestart = () => {
		setPlayers((prevPlayers) => prevPlayers.map((player) => ({ ...player, balance: 0 })));
		setSelectedUsers(new Set());
		setInputValue('');
	};

	const handleTransfer = (amount: number) => {
		const selectedArray = Array.from(selectedUsers);
		if (selectedArray.length !== 2 || Number.isNaN(amount)) return;

		const [payer, receiver] = selectedArray;
		setPlayers((prevPlayers) =>
			prevPlayers.map((player) => {
				if (player.name === payer) return { ...player, balance: player.balance - amount };
				if (player.name === receiver) return { ...player, balance: player.balance + amount };
				return player;
			}),
		);
		setInputValue('');
		setSelectedUsers(new Set());
	};

	return (
		<div className="flex flex-col items-center p-6 h-full min-h-screen bg-principal-1 gap-6">
			<div className="flex w-full justify-between items-center">
				<button
					onClick={handleOpen}
					type="button"
					className="text-white text-xl rounded-lg p-2 transition-all bg-principal-2 hover:bg-principal-3 hover:scale-110"
				>
					<MdOutlineWrapText />
				</button>
				<img src={logo} alt="Logo Monopoly" className="h-12" />
				<button
					onClick={handleRestart}
					type="button"
					className="text-white text-xl rounded-lg p-2 transition-all bg-principal-2 hover:bg-principal-3 hover:scale-110"
				>
					<HiOutlineRefresh />
				</button>
			</div>

			<NewGameComponent open={open} handleOpen={handleOpen} setPlayers={setPlayers} />

			<div className="flex flex-col text-center gap-4 w-full mt-6 max-w-lg">
				<input
					className="bg-principal-4 rounded-lg border-b-2 px-2 py-1 text-xl text-white text-center border-principal-6 focus:outline-none focus:bg-principal-5"
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<div className="flex gap-4">
					<button
						type="button"
						onClick={() => handleTransfer(Number(inputValue))}
						className="bg-verde p-2 rounded-lg text-2xl text-white hover:scale-105 transition-all"
					>
						<IoMdAdd />
					</button>
					<button
						type="button"
						onClick={() => handleTransfer(Number(inputValue))}
						className="flex justify-center bg-orange-500 p-2 w-full rounded-lg text-2xl text-white text-center hover:scale-105 transition-all"
					>
						<BiTransferAlt />
					</button>
					<button
						type="button"
						onClick={() => handleTransfer(-Number(inputValue))}
						className="bg-vermelho p-2 rounded-lg text-2xl text-white hover:scale-105 transition-all"
					>
						<RiSubtractFill />
					</button>
				</div>
			</div>

			<div className="flex flex-wrap gap-4 justify-center md:justify-center">
				{players.map((player) => (
					<UserCard
						key={player.name}
						isSelected={selectedUsers.has(player.name)}
						selectionColor={getSelectionColor(player.name)}
						onSelect={() => toggleSelection(player.name)}
						name={player.name}
						balance={formatCurrency(player.balance)}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
