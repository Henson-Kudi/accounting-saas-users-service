import "dotenv/config";
import { updateDatabaseConnections } from "../../../../utils/db";
import { UsersRepo } from "../../../../use-cases";
import { User } from "../../../../schema-entities/interRefs";

export default async function companyCreated(company: any) {
    try {
        // create new database for this user
        if (company?.id) {
            const serviceDbName = process.env.DATABASE_NAME ?? "users_db";
            const dbName = `${company?.id}_${serviceDbName}`;

            console.log(
                "------------------------Company Processor running---------------------------"
            );

            // console.log(dbName);

            const dbConn = updateDatabaseConnections(dbName);

            if (dbConn) {
                console.log("all good");
                const adminUser: User = {
                    ...company?.rootUser,
                    companyId: company?.id?.toString(),
                    isRootUser: true,
                };
                // create Root User for company (initialise company db)
                const createdUser = await UsersRepo.createUser(
                    dbConn,
                    adminUser
                );

                console.log("---------------------------------------");
                console.log("Created root user in company db");
                console.log("---------------------------------------");
            }
        }

        // console.log(company);
    } catch (err) {
        console.log(err);
        // In case of failure here we want to send a mail or slack message to dev team for the admin user to be created in db
        // throw err;
    }
}
