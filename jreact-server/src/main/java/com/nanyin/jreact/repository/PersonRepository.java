package com.nanyin.jreact.repository;

import com.nanyin.jreact.entry.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person,Long> {
}
