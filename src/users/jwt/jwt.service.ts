import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";


@Injectable()
export class JwtTokenService {
    generateIdToken(payload: any, expiryTime: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, "SECRET", {
                expiresIn: expiryTime,
                issuer: "RilHomie"
            }, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }

    generateRefreshToken(payload: any, expiryTime: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, "SECRET", {
                expiresIn: expiryTime,
                issuer: "RilHomie"
            }, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }

    generateAuthToken(payload: any, expiryTime: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, "SECRET", {
                expiresIn: expiryTime,
                issuer: "RilHomie"
            }, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }

    verifyToken(token: string){
        jwt.verify(token, "SECRET", function(err, decoded) {
            if (err) {
                return false
            }
            return decoded
        })
    }

    refreshToken(oldToken: string, refreshToken: string) {
        
    }
}