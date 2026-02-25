"use client";
import { motion } from "framer-motion";
// import PricingCard from "@/components/custom/pricing-card";
// import data from "@/details.json";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Pricing = () => {
	return (
		<>
			{/* Pricing Section */}
			<section id="pricing" className="py-24 sm:py-32 px-4 lg:px-[10%]">
				<GridPattern
					width={50}
					height={50}
					x={-1}
					y={-1}
					strokeDasharray={"4 2"}
					className={cn(
						"mask-[radial-gradient(700px_circle_at_center,white,transparent)]"
					)}
				/>
				<div className="mx-auto flex max-w-232 flex-col items-center text-center">
					<div className="mx-auto mb-16 flex max-w-232 flex-col items-center space-y-4 text-center">
						<h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
							Simple, transparent <span className="text-primary">pricing</span>
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Choose the perfect plan for your business needs
						</p>
					</div>
					<Link href="https://cal.com/brandnbusiness" target="_blank">
						{/* <ShimmerButton className="shadow-2xl"> */}
						<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
							Book a free consultation
						</span>
						{/* </ShimmerButton> */}
					</Link>
				</div>

				<div className="flex flex-col justify-center items-center">
					<motion.h1
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
						className="relative top-8 lg:top-16 font-bold leading-[1.1] text-8xl lg:text-[10rem]"
					>
						Pricing
					</motion.h1>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-start flex-wrap">
						{/* {data.pricing.map((plan) => (
							<div key={plan.name}>
								<PricingCard plan={plan} />
								<div>hello</div>
							</div>
						))} */}
					</div>
				</div>
			</section>
		</>
	);
};

export default Pricing;