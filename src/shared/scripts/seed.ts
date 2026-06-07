import 'dotenv/config';
import { prisma } from '../db/prisma.js';
import { config } from '../configs/env.js';

// Pre-hashed password for "Password123!" using argon2id
const PASSWORD_HASH =
  '$argon2id$v=19$m=65536,t=3,p=4$2O8U0/L0/eQ4Lz8m9WfA$kH7D2yO8m2Q7P1D5J0F7X8M3T6W2P9L2V1J';

async function main(): Promise<void> {
  if (config.NODE_ENV === 'production') {
    throw new Error('Refusing to run seed script against production database');
  }

  console.log('Resetting tables...');
  // Delete in reverse order of dependencies to satisfy foreign keys
  await prisma.assignmentHistory.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding fixtures in transaction...');
  await prisma.$transaction(async (tx) => {
    // 1. NOTE: Create Users with deterministic IDs
    const alice = await tx.user.create({
      data: {
        id: 'usr_alice',
        email: 'alice@acme.com',
        passwordHash: PASSWORD_HASH,
      },
    });

    const bob = await tx.user.create({
      data: {
        id: 'usr_bob',
        email: 'bob@acme.com',
        passwordHash: PASSWORD_HASH,
      },
    });

    const carol = await tx.user.create({
      data: {
        id: 'usr_carol',
        email: 'carol@acme.com',
        passwordHash: PASSWORD_HASH,
      },
    });

    const tony = await tx.user.create({
      data: {
        id: 'usr_tony',
        email: 'tony@stark.com',
        passwordHash: PASSWORD_HASH,
      },
    });

    const pepper = await tx.user.create({
      data: {
        id: 'usr_pepper',
        email: 'pepper@stark.com',
        passwordHash: PASSWORD_HASH,
      },
    });

    // 2. NOTE: Create Workspaces/companies
    const acme = await tx.workspace.create({
      data: {
        id: 'ws_acme',
        name: 'Acme Corp',
      },
    });

    const stark = await tx.workspace.create({
      data: {
        id: 'ws_stark',
        name: 'Stark Industries',
      },
    });

    // 3. NOTE:  Create Workspace Memberships
    await tx.workspaceMember.createMany({
      data: [
        {
          id: 'mem_alice_acme',
          workspaceId: acme.id,
          userId: alice.id,
          role: 'ADMIN',
        },
        {
          id: 'mem_bob_acme',
          workspaceId: acme.id,
          userId: bob.id,
          role: 'MEMBER',
        },
        {
          id: 'mem_carol_acme',
          workspaceId: acme.id,
          userId: carol.id,
          role: 'MEMBER',
        },

        {
          id: 'mem_tony_stark',
          workspaceId: stark.id,
          userId: tony.id,
          role: 'ADMIN',
        },
        {
          id: 'mem_pepper_stark',
          workspaceId: stark.id,
          userId: pepper.id,
          role: 'MEMBER',
        },
      ],
    });

    // 4. NOTE:  Create Assets
    const laptopAcme = await tx.asset.create({
      data: {
        id: 'ast_acme_laptop1',
        workspaceId: acme.id,
        name: 'MacBook Pro 16" M3',
        serialNumber: 'ACME-LP-001',
        type: 'LAPTOP',
        status: 'ASSIGNED',
        assignedToId: bob.id,
      },
    });

    const monitorAcme = await tx.asset.create({
      data: {
        id: 'ast_acme_monitor1',
        workspaceId: acme.id,
        name: 'Dell UltraSharp 27"',
        serialNumber: 'ACME-MN-002',
        type: 'MONITOR',
        status: 'IN_STORAGE',
      },
    });

    const keyboardAcme = await tx.asset.create({
      data: {
        id: 'ast_acme_keyboard1',
        workspaceId: acme.id,
        name: 'Keychron K2 Keyboard',
        serialNumber: 'ACME-AC-003',
        type: 'ACCESSORY',
        status: 'UNDER_REPAIR',
      },
    });

    const holoPadStark = await tx.asset.create({
      data: {
        id: 'ast_stark_laptop1',
        workspaceId: stark.id,
        name: 'Stark Holo-Pad v4',
        serialNumber: 'STARK-LP-999',
        type: 'LAPTOP',
        status: 'ASSIGNED',
        assignedToId: pepper.id,
      },
    });

    // 5. Create History Logs
    await tx.assignmentHistory.createMany({
      data: [
        {
          id: 'log_acme_laptop1',
          workspaceId: acme.id,
          assetId: laptopAcme.id,
          assignedToId: bob.id,
          assignedById: alice.id,
          action: 'ASSIGN',
          notes: 'Standard developer equipment allocation.',
        },
        {
          id: 'log_acme_keyboard1',
          workspaceId: acme.id,
          assetId: keyboardAcme.id,
          assignedById: alice.id,
          action: 'REPAIR_SEND',
          notes: 'Sending to IT support for sticky spacebar switch repair.',
        },
        {
          id: 'log_stark_laptop1',
          workspaceId: stark.id,
          assetId: holoPadStark.id,
          assignedToId: pepper.id,
          assignedById: tony.id,
          action: 'ASSIGN',
          notes: 'Holo-Pad allocation for Stark Industries operations.',
        },
      ],
    });
  });

  const counts = {
    users: await prisma.user.count(),
    workspaces: await prisma.workspace.count(),
    memberships: await prisma.workspaceMember.count(),
    assets: await prisma.asset.count(),
    historyLogs: await prisma.assignmentHistory.count(),
  };

  console.log('Seed complete:', counts);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
