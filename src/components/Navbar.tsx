"use client";

import { cn } from "@/utils/cn";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { useState } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
} from "framer-motion";

export default function Navbar({ className }: { className?: string }) {
	const [active, setActive] = useState<string | null>(null);

	const { scrollYProgress } = useScroll();

	const [visible, setVisible] = useState(false);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		// Check if current is not undefined and is a number
		if (typeof current === "number") {
			let direction = current! - scrollYProgress.getPrevious()!;

			if (scrollYProgress.get() < 0.05) {
				setVisible(true);
			} else {
				if (direction < 0) {
					setVisible(true);
				} else {
					setVisible(true);
				}
			}
		}
	});

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{
					opacity: 1,
					y: -100,
				}}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
				className={cn(
					"fixed top-10 inset-x-0 max-w-xl mx-auto z-50 ",
					className
				)}
			>
				<Menu setActive={setActive}>
					<MenuItem
						setActive={setActive}
						active={active}
						item="Home"
						link="/"
					/>
					<MenuItem setActive={setActive} active={active} item="Projects">
						<div className="text-sm grid grid-cols-2 gap-5">
							<ProductItem
								title="Bingooo.site"
								href="https://bingooo.site"
								src="/Bingo.png"
								description="A Real-time Multiplayer game platfrom using Next.js, websocket hosted on AWS EC2"
								isLive
							/>
							<ProductItem
								title="Book Town Project"
								href="https://github.com/Tarunjaat2005/BookTown"
								src="/booktown.jpg"
								description=" A full-stack bookstore app with login/signup and secure payments, built using React.js, Node.js, and MongoDB."
							/>
							<ProductItem
								title="Weather Forcasting"
								href="https://github.com/Tarunjaat2005/Whether-forcasting"
								src="/weather.jpg"
								description="A simple React app that shows real-time weather updates using external APIs."
							/>
						</div>
					</MenuItem>
					<MenuItem
						setActive={setActive}
						active={active}
						item="Contact Me"
						link="/contact-me"
					/>
				</Menu>
			</motion.div>
		</AnimatePresence>
	);
}
