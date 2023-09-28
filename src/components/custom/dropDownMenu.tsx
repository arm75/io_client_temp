import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react"

import { Button } from "../shadcn/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../shadcn/dropdown-menu"
import AvatarDemo from "./avatar"
import { useQueryClient } from "@tanstack/react-query"
import IUser from "../../models/interfaces/user"

export default function DropDownMenuDemo() {
	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="link"
					className="focus:hidden hover:no-underline"
				>
					<AvatarDemo />
					<span className="text-lg ml-3 mb-2">{authMeQueryData?.username}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 mr-8">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Billing</span>
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
						<Keyboard className="mr-2 h-4 w-4" />
						<span>Keyboard shortcuts</span>
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
						<Users className="mr-2 h-4 w-4" />
						<span>Team</span>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
							<UserPlus className="mr-2 h-4 w-4" />
							<span>Invite users</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
									<Mail className="mr-2 h-4 w-4" />
									<span>Email</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
									<MessageSquare className="mr-2 h-4 w-4" />
									<span>Message</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
									<PlusCircle className="mr-2 h-4 w-4" />
									<span>More...</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
						<Plus className="mr-2 h-4 w-4" />
						<span>New Team</span>
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
					<Github className="mr-2 h-4 w-4" />
					<span>GitHub</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
					<LifeBuoy className="mr-2 h-4 w-4" />
					<span>Support</span>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<Cloud className="mr-2 h-4 w-4" />
					<span>API</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white">
					<LogOut className="mr-2 h-4 w-4" />
					<span>=9Log out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
