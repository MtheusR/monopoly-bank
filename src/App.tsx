import { useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { MdOutlineWrapText } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
import { BiTransferAlt } from 'react-icons/bi';
import { UserCard } from './UserCardComponent';
import logo from './assets/monopoly-logo.svg'; // Ajuste o caminho conforme necessário
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

	// const getSelectionColor = (name: string) => {
	// 	const selectedArray = Array.from(selectedUsers);
	// 	return selectedArray.indexOf(name) === 0
	// 		? 'verde'
	// 		: selectedArray.indexOf(name) === 1
	// 			? 'vermelho'
	// 			: 'padrao';
	// };

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

	// Adiciona o valor ao saldo do jogador selecionado
	const handleAdd = () => {
		const value = Number.parseFloat(inputValue);
		if (!Number.isNaN(value) && selectedUsers.size === 1) {
			const playerName = Array.from(selectedUsers)[0];
			setPlayers((prevPlayers) =>
				prevPlayers.map((player) =>
					player.name === playerName ? { ...player, balance: player.balance + value } : player,
				),
			);
			setInputValue('');
		}
	};

	// Subtrai o valor do saldo do jogador selecionado
	const handleSubtract = () => {
		const value = Number.parseFloat(inputValue);
		if (!Number.isNaN(value) && selectedUsers.size === 1) {
			const playerName = Array.from(selectedUsers)[0];
			setPlayers((prevPlayers) =>
				prevPlayers.map((player) =>
					player.name === playerName ? { ...player, balance: player.balance - value } : player,
				),
			);
		}
		setInputValue('');
	};

	const handleRestart = () => {
		setPlayers((prevPlayers) => prevPlayers.map((player) => ({ ...player, balance: 0 })));
		setSelectedUsers(new Set()); // Desativa todas as seleções
		setInputValue('');
	};

	// Transfere o valor entre os jogadores selecionados
	const handleTransfer = () => {
		const value = Number.parseFloat(inputValue);
		if (!Number.isNaN(value) && selectedUsers.size === 2) {
			const [fromPlayerName, toPlayerName] = Array.from(selectedUsers).reverse(); // Inverte a ordem dos jogadores
			setPlayers((prevPlayers) =>
				prevPlayers.map((player) => {
					if (player.name === fromPlayerName) {
						return { ...player, balance: player.balance - value };
					}
					if (player.name === toPlayerName) {
						return { ...player, balance: player.balance + value };
					}
					return player;
				}),
			);
		}
		setInputValue('');
	};

	return (
		<div className="flex flex-col items-center p-6 h-full min-h-screen bg-principal-1 gap-6">
			{/* Topbar */}
			<div className="flex w-full justify-between items-center">
				<button
					onClick={handleOpen}
					type="button"
					className="text-white text-xl rounded-lg p-2 transition-all bg-principal-2 hover:bg-principal-3 hover:scale-110"
				>
					<MdOutlineWrapText />
				</button>
				<img src={logo} alt="Logo Monopoly" />
				<button
					onClick={handleRestart}
					type="button"
					className="text-white text-xl rounded-lg p-2 transition-all bg-principal-2 hover:bg-principal-3 hover:scale-110"
				>
					<HiOutlineRefresh />
				</button>
			</div>

			{/* Novo Jogo */}
			<NewGameComponent open={open} handleOpen={handleOpen} setPlayers={setPlayers} />

			{/* Transferência */}
			<div className="flex flex-col text-center gap-4">
				<h2 className="text-principal-6">Transferência</h2>
				<div className="flex flex-col gap-2">
					<input
						className="bg-principal-4 rounded-lg border-b-2 focus:bg-principal-5 px-2 py-1 text-xl text-white border-principal-6 focus:outline-none"
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<div className="flex gap-2">
						<button
							type="button"
							className="bg-verde p-1 px-3 rounded-lg text-2xl hover:scale-105 transition-all text-white shadow-inner shadow-green-400 focus:outline-none focus:scale-105"
							onClick={handleAdd}
						>
							<IoMdAdd />
						</button>
						<button
							type="button"
							className="flex justify-center bg-orange-500 w-full p-1 px-3 rounded-lg text-2xl hover:scale-105 transition-all text-white shadow-inner shadow-orange-400 focus:outline-none focus:scale-105"
							onClick={handleTransfer}
						>
							<BiTransferAlt />
						</button>
						<button
							type="button"
							className="bg-vermelho p-1 px-3 rounded-lg text-2xl hover:scale-105 transition-all text-white shadow-inner shadow-red-400 focus:outline-none focus:scale-105"
							onClick={handleSubtract}
						>
							<RiSubtractFill />
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4 bg-principal-0 rounded-lg p-4">
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
