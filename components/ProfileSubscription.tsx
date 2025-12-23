"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

interface ProfileSubscriptionProps {
    available: string;
    total: string;
    creditsDescription?: string;
}

function formatPlanName(tier: string) {
    switch (tier.toLowerCase()) {
        case "pro":
            return "Pro Plan";
        case "starter":
            return "Starter Plan";
        case "free":
            return "Free Plan";
        default:
            return tier;
    }
}

export default function ProfileSubscription({
    available,
    total,
    creditsDescription = "Minutes are deducted when you generate a session.",
}: ProfileSubscriptionProps) {
    const router = useRouter();
    const { tier: currentTier, loading: userLoading } = useUser();

    const handleUpgrade = () => {
        router.push("/pricing");
    };

    const handleManageSubscription = () => {
        const portalUrl = "https://billing.stripe.com/p/login/9AQ9BKfwW0e1c80288";
        window.open(portalUrl, '_blank');
    };

    const percentage = Math.min(
        100,
        Math.max(0, (parseInt(available, 10) / parseInt(total, 10)) * 100)
    );

    // Determine subscription description based on tier
    let subscriptionDescription: string | null;
    if (currentTier === "free") {
        subscriptionDescription = "Unlock all features with a subscription.";
    } else if (currentTier === "starter") {
        subscriptionDescription = "Get more time and premium voices with PRO.";
    } else {
        subscriptionDescription = null; // PRO users see no description
    }

    const showUpgrade = !userLoading && currentTier === "free";
    const showStarterActions = !userLoading && currentTier === "starter";
    const showProAction = !userLoading && currentTier === "pro";

    return (
        <div className="w-full max-w-xl space-y-6">
            <div className="w-full bg-zinc-900 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <h2 className="text-md font-regular">
                            {formatPlanName(currentTier ?? "Free")}
                        </h2>
                        {subscriptionDescription && (
                            <p className="text-xs text-muted-foreground">
                                {subscriptionDescription}
                            </p>
                        )}
                    </div>

                    {/* Free users: Upgrade plan button */}
                    {showUpgrade && (
                        <Button
                            variant="secondary"
                            size="xs"
                            onClick={handleUpgrade}
                            className="self-center"
                        >
                            Upgrade Plan
                        </Button>
                    )}

                    {/* Starter users: Upgrade + Manage */}
                    {showStarterActions && (
                        <div className="flex space-x-2">
                            <Button
                                variant="secondary"
                                size="xs"
                                onClick={handleUpgrade}
                            >
                                Upgrade Plan
                            </Button>
                            <Button
                                variant="secondary"
                                size="xs"
                                onClick={handleManageSubscription}
                            >
                                Manage
                            </Button>
                        </div>
                    )}

                    {/* Pro users: only Manage */}
                    {showProAction && (
                        <Button
                            variant="secondary"
                            size="xs"
                            onClick={handleManageSubscription}
                            className="self-center"
                        >
                            Manage
                        </Button>
                    )}
                </div>

                <div className="h-px bg-zinc-800 my-6" />

                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <span className="text-sm font-regular text-foreground">
                                Minutes Available: {available}{" "}
                                <span className="text-muted-foreground">
                                    / {total}
                                </span>
                            </span>
                            <p className="text-xs text-muted-foreground">
                                {creditsDescription}
                            </p>
                        </div>
                    </div>

                    <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2">
                        <div
                            className="bg-white h-1.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
