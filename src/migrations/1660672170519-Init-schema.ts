import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitSchema1660672170519 implements MigrationInterface {
    name = 'InitSchema1660672170519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`genre\` (\`genreId\` int NOT NULL AUTO_INCREMENT, \`genreUUID\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_73bbea2a9212fc3760e70f0cab\` (\`genreUUID\`), INDEX \`IDX_0c67b287a0c0840e7db859340e\` (\`isDeleted\`), PRIMARY KEY (\`genreId\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`author\` (\`authorId\` int NOT NULL AUTO_INCREMENT, \`authorUUID\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d74bcf812d549831b321e04d19\` (\`authorUUID\`), INDEX \`IDX_f0b38fed32af31e6b6ddfb141a\` (\`isDeleted\`), PRIMARY KEY (\`authorId\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`book\` (\`bookId\` int NOT NULL AUTO_INCREMENT, \`bookUUID\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`pages\` int NOT NULL, \`year\` int NOT NULL, \`quantity\` int NOT NULL, \`ISBN\` varchar(255) NOT NULL, \`cost\` int NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`genreId\` int NULL, \`authorId\` int NULL, UNIQUE INDEX \`IDX_d1710689a6c9370a3cde69720c\` (\`bookUUID\`), INDEX \`IDX_ae96df391d9762bdc96c6d0bd9\` (\`isDeleted\`), PRIMARY KEY (\`bookId\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`loan\` (\`loanId\` int NOT NULL AUTO_INCREMENT, \`loanUUID\` varchar(36) NOT NULL, \`bookId\` int NOT NULL, \`readerId\` int NOT NULL, \`sinceDate\` int NOT NULL, \`untilDate\` int NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_0964c233f146e0648b97406d5a\` (\`loanUUID\`), INDEX \`IDX_c33f793dfced11a18fe12753cf\` (\`isDeleted\`), PRIMARY KEY (\`loanId\`)) ENGINE=InnoDB`)
        await queryRunner.query(`CREATE TABLE \`reader\` (\`readerId\` int NOT NULL AUTO_INCREMENT, \`readerUUID\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phoneNumber\` int NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_780be91cfb90410752b9ab7926\` (\`readerUUID\`), INDEX \`IDX_a9bc12b01c44d65c67e98f2d23\` (\`isDeleted\`), PRIMARY KEY (\`readerId\`)) ENGINE=InnoDB`)
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_6ee57fcf22c96838179e5b46b2d\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`genreId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_66a4f0f47943a0d99c16ecf90b2\` FOREIGN KEY (\`authorId\`) REFERENCES \`author\`(\`authorId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_1465982ea6993042a656754f4cc\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`bookId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE \`loan\` ADD CONSTRAINT \`FK_ca18731243df2f2416bde4a4e1d\` FOREIGN KEY (\`readerId\`) REFERENCES \`reader\`(\`readerId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_ca18731243df2f2416bde4a4e1d\``)
        await queryRunner.query(`ALTER TABLE \`loan\` DROP FOREIGN KEY \`FK_1465982ea6993042a656754f4cc\``)
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_66a4f0f47943a0d99c16ecf90b2\``)
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_6ee57fcf22c96838179e5b46b2d\``)
        await queryRunner.query(`DROP INDEX \`IDX_a9bc12b01c44d65c67e98f2d23\` ON \`reader\``)
        await queryRunner.query(`DROP INDEX \`IDX_780be91cfb90410752b9ab7926\` ON \`reader\``)
        await queryRunner.query(`DROP TABLE \`reader\``)
        await queryRunner.query(`DROP INDEX \`IDX_c33f793dfced11a18fe12753cf\` ON \`loan\``)
        await queryRunner.query(`DROP INDEX \`IDX_0964c233f146e0648b97406d5a\` ON \`loan\``)
        await queryRunner.query(`DROP TABLE \`loan\``)
        await queryRunner.query(`DROP INDEX \`IDX_ae96df391d9762bdc96c6d0bd9\` ON \`book\``)
        await queryRunner.query(`DROP INDEX \`IDX_d1710689a6c9370a3cde69720c\` ON \`book\``)
        await queryRunner.query(`DROP TABLE \`book\``)
        await queryRunner.query(`DROP INDEX \`IDX_f0b38fed32af31e6b6ddfb141a\` ON \`author\``)
        await queryRunner.query(`DROP INDEX \`IDX_d74bcf812d549831b321e04d19\` ON \`author\``)
        await queryRunner.query(`DROP TABLE \`author\``)
        await queryRunner.query(`DROP INDEX \`IDX_0c67b287a0c0840e7db859340e\` ON \`genre\``)
        await queryRunner.query(`DROP INDEX \`IDX_73bbea2a9212fc3760e70f0cab\` ON \`genre\``)
        await queryRunner.query(`DROP TABLE \`genre\``)
    }
}
