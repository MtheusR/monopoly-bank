import { useState } from 'react';
import { Button, Dialog } from '@material-tailwind/react';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
import coins from './assets/coins.svg';

interface Player {
	name: string;
	balance: number;
}

interface NewGameProps {
	open: boolean;
	handleOpen: () => void;
	setPlayers: (players: Player[]) => void;
}

export function NewGameComponent({ open, handleOpen, setPlayers }: NewGameProps) {
	const [players, setLocalPlayers] = useState<Player[]>([]);
	const [newPlayer, setNewPlayer] = useState('');
	const [initialBalance, setInitialBalance] = useState('');

	const addPlayer = () => {
		const balance = Number.parseFloat(initialBalance.replace(',', '.'));
		if (
			newPlayer.trim() !== '' &&
			!players.some((p) => p.name === newPlayer) &&
			!Number.isNaN(balance)
		) {
			const updatedPlayers = [...players, { name: newPlayer, balance }];
			setLocalPlayers(updatedPlayers);
			setNewPlayer('');
		}
	};

	const removePlayer = (name: string) => {
		setLocalPlayers(players.filter((player) => player.name !== name));
	};

	const confirmPlayers = () => {
		setPlayers(players);
		handleOpen();
	};

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className="flex flex-col bg-principal-1 text-white rounded-xl p-4 gap-4 shadow-lg"
			placeholder={undefined}
			onPointerEnterCapture={undefined}
			onPointerLeaveCapture={undefined}
		>
			<div className="text-white text-xl text-center font-bold">Novo Jogo</div>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-center">
					<p className="text-blue-gray-100 text-base mb-2">Saldo Inicial</p>
					<div className="flex gap-2">
						<input
							type="text"
							value={initialBalance}
							onChange={(e) => setInitialBalance(e.target.value)}
							className="flex-grow bg-principal-4 rounded-lg border-b-2 text-white text-lg px-2 py-1 border-principal-6 focus:outline-none focus:bg-principal-5"
							placeholder="R$ 0,00"
						/>
					</div>
				</div>

				<div>
					<div className="flex gap-2 mt-4">
						<input
							type="text"
							value={newPlayer}
							onChange={(e) => setNewPlayer(e.target.value)}
							className="flex-grow bg-principal-4 rounded-lg border-b-2 text-white text-lg px-2 py-1 border-principal-6 focus:outline-none focus:bg-principal-5"
							placeholder="Nome do jogador"
						/>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={addPlayer}
							className="bg-orange-500 p-2 rounded-lg text-2xl hover:scale-110 transition-all text-white shadow-inner shadow-orange-400 focus:outline-none"
						>
							<IoMdAdd />
						</button>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					{players.length > 0 ? (
						players.map((player) => (
							<div
								key={player.name}
								className="flex justify-between items-center bg-principal-2 p-2 rounded-lg"
							>
								<span className="text-lg">{player.name}</span>
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									onClick={() => removePlayer(player.name)}
									className="bg-vermelho p-1 rounded-lg text-2xl hover:scale-110 transition-all text-white shadow-inner shadow-red-400 focus:outline-none"
								>
									<RiSubtractFill />
								</button>
							</div>
						))
					) : (
						<p className="text-principal-6 text-center">Nenhum jogador adicionado.</p>
					)}
				</div>
			</div>

			<div className="flex justify-between">
				<Button
					variant="text"
					color="red"
					onClick={handleOpen}
					placeholder={undefined}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				>
					Cancelar
				</Button>
				<Button
					variant="gradient"
					color="green"
					onClick={confirmPlayers}
					placeholder={undefined}
					onPointerEnterCapture={undefined}
					onPointerLeaveCapture={undefined}
				>
					Confirmar
				</Button>
			</div>
		</Dialog>
	);
}
